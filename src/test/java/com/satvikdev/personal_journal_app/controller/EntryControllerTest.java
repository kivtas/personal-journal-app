package com.satvikdev.personal_journal_app.controller;

import com.satvikdev.personal_journal_app.model.Entry;
import com.satvikdev.personal_journal_app.service.EntryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class EntryControllerTest {

    private MockMvc mockMvc;

    @Mock
    private EntryService entryService;

    @InjectMocks
    private EntryController entryController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(entryController).build();
    }

    @Test
    public void testGetAllEntries() {
        // Arrange
        Entry entry1 = createEntry(1L, "First Entry", LocalDateTime.now(), 0.5);
        Entry entry2 = createEntry(2L, "Second Entry", LocalDateTime.now(), -0.3);
        List<Entry> entries = Arrays.asList(entry1, entry2);
        when(entryService.getAllEntries()).thenReturn(entries);

        // Act
        ResponseEntity<List<Entry>> response = entryController.getAllEntries();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
        verify(entryService, times(1)).getAllEntries();
    }

    @Test
    public void testCreateEntry() {
        // Arrange
        Entry entry = createEntry(null, "New Entry", LocalDateTime.now(), 0.8);
        when(entryService.createEntry(entry.getContent())).thenReturn(entry);

        // Act
        ResponseEntity<Entry> response = entryController.createEntry(entry);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(entry, response.getBody());
        verify(entryService, times(1)).createEntry(entry.getContent());
    }

    @Test
    public void testGetEntryByIdFound() {
        // Arrange
        Long entryId = 1L;
        Entry entry = createEntry(entryId, "First Entry", LocalDateTime.now(), 0.5);
        when(entryService.getEntryById(entryId)).thenReturn(entry);

        // Act
        ResponseEntity<Entry> response = entryController.getEntryById(entryId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(entry, response.getBody());
        verify(entryService, times(1)).getEntryById(entryId);
    }

    @Test
    public void testGetEntryByIdNotFound() {
        // Arrange
        Long entryId = 1L;
        when(entryService.getEntryById(entryId)).thenReturn(null);

        // Act
        ResponseEntity<Entry> response = entryController.getEntryById(entryId);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(entryService, times(1)).getEntryById(entryId);
    }

    @Test
    public void testDeleteEntryFound() {
        // Arrange
        Long entryId = 1L;
        when(entryService.deleteEntryById(entryId)).thenReturn(true);

        // Act
        ResponseEntity<Void> response = entryController.deleteEntry(entryId);

        // Assert
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(entryService, times(1)).deleteEntryById(entryId);
    }

    @Test
    public void testDeleteEntryNotFound() {
        // Arrange
        Long entryId = 1L;
        when(entryService.deleteEntryById(entryId)).thenReturn(false);

        // Act
        ResponseEntity<Void> response = entryController.deleteEntry(entryId);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(entryService, times(1)).deleteEntryById(entryId);
    }

    // Helper method to create Entry objects for testing
    private Entry createEntry(Long id, String content, LocalDateTime timestamp, double sentiment) {
        Entry entry = new Entry();
        entry.setId(id);
        entry.setContent(content);
        entry.setTimestamp(timestamp);
        entry.setSentiment(sentiment);
        return entry;
    }
}
