package com.satvikdev.personal_journal_app.repository;

import com.satvikdev.personal_journal_app.model.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {
    
}
