package com.satvikdev.personal_journal_app.service;

import com.satvikdev.personal_journal_app.model.Entry;
import com.satvikdev.personal_journal_app.repository.EntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.json.JSONObject;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EntryService {
    private final EntryRepository entryRepository;

    @Autowired
    private RestTemplate restTemplate;

    public EntryService(EntryRepository entryRepository) {
        this.entryRepository = entryRepository;
    }

    public List<Entry> getAllEntries() {
        return entryRepository.findAll(); // Fetches all entries from the database
    }

    public Entry createEntry(String content) {
        Entry entry = new Entry();
        entry.setContent(content);
        entry.setTimestamp(LocalDateTime.now());
        double sentiment = getSentimentFromMicroservice(content);
        entry.setSentiment(sentiment);

        return entryRepository.save(entry); // Saves the new entry to the database
    }

    public Entry getEntryById(Long id) {
        Optional<Entry> entryOptional = entryRepository.findById(id);
        return entryOptional.orElse(null); // Return the entry if found, or null if not found
    }

    public boolean deleteEntryById(Long id) {
        Optional<Entry> entryOptional = entryRepository.findById(id);
        if (entryOptional.isPresent()) {
            entryRepository.deleteById(id); // If the entry exists, delete it
            return true;
        }
        return false; // Return false if the entry wasn't found
    }

    // Optional: Remove if not needed
    public void deleteEntry(Long id) {
        entryRepository.deleteById(id);
    }

    private double getSentimentFromMicroservice(String content) {
        String url = "http://localhost:5000/analyze-sentiment";

        JSONObject json = new JSONObject();
        json.put("content", content);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(json.toString(), headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        JSONObject responseBody = new JSONObject(response.getBody());
        String res = responseBody.get("sentiment").toString();
        return Double.parseDouble(res);
    }
}
