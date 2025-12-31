package com.example.demo.controller;

import com.example.demo.model.Student;
import com.example.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    // Get all students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get student by ID (optional)
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    // Add new student
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    // Update student
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            student.setName(studentDetails.getName());
            student.setEmail(studentDetails.getEmail());
            return studentRepository.save(student);
        } else {
            return null; // or throw exception
        }
    }

    // Delete student
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentRepository.deleteById(id);
    }
}
