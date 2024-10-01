package com.satvikdev.personal_journal_app.service;

import com.satvikdev.personal_journal_app.model.Entry;
import com.satvikdev.personal_journal_app.repository.EntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EntryService {
    @Autowired
    private final EntryRepository entryRepository;
    public EntryService(EntryRepository entryRepository) {
        this.entryRepository = entryRepository;
    }
    public List<Entry> getAllEntries() {
        return entryRepository.findAll(); // Fetches all entries from the database
    }

    public Entry createEntry(String content) {
        Entry entry = new Entry();
        entry.setContent(content);
        entry.setTimestamp(LocalDate.from(LocalDateTime.now())); // Set the current timestamp
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

    public void deleteEntry(Long id) {
        entryRepository.deleteById(id);
    }
}
