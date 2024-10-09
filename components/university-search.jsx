"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion"; // For animation effects

const schemas = [
  "Classroom",
  "Department",
  "Course",
  "Instructor",
  "Section",
  "Teaches",
  "Student",
  "Takes",
  "Advisor",
  "TimeSlot",
  "Prerequisites",
];

export default function Component() {
  const [query, setQuery] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("Classroom");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for artificial loading

  // Simulated data fetch with artificial delay
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (data[selectedSchema]) {
        if (query === "") {
          setResults(data[selectedSchema]);
        } else {
          const filteredResults = data[selectedSchema].filter((item) =>
            Object.values(item).some((value) =>
              String(value).toLowerCase().includes(query.toLowerCase())
            )
          );
          setResults(filteredResults);
        }
      } else {
        setResults([]);
      }
      setLoading(false);
    }, 1000); // Artificial loading delay of 1 second
  }, [query, selectedSchema]);

  return (
    <div className="container mx-auto p-8">
    <Card className="shadow-lg border border-gray-200 rounded-lg">
      {/* Unified Header for both Search and Results */}
      <CardHeader className="bg-gray-50 p-6 border-b border-gray-200">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          University Information Search
        </CardTitle>
        <CardDescription className="text-gray-600">
          Search across various university data schemas
        </CardDescription>
      </CardHeader>
  
      {/* Search Section */}
      <CardContent className="p-6 border-b border-gray-200">
        <div className="flex space-x-4 items-center">
          <Select value={selectedSchema} onValueChange={setSelectedSchema}>
            <SelectTrigger className="w-[250px] bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <SelectValue placeholder="Select a schema" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-md border border-gray-200 rounded-md">
              {schemas.map((schema) => (
                <SelectItem key={schema} value={schema}>
                  {schema}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="text"
            placeholder="Enter your search query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <Button className="bg-blue-600 text-white p-2 rounded-md" >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
  
      {/* Search Results Section */}
      <CardContent className="p-6">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : results.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Table className="min-w-full divide-y divide-gray-200">
              <TableHeader className="bg-gray-50">
                <TableRow>
                  {Object.keys(results[0]).map((key) => (
                    <TableHead
                      key={key}
                      className="text-left py-3 px-4 text-sm font-medium text-gray-600"
                    >
                      {key}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index} className="hover:bg-gray-100">
                    {Object.values(result).map((value, i) => (
                      <TableCell
                        key={i}
                        className="py-3 px-4 text-sm text-gray-700"
                      >
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        ) : (
          <p className="text-gray-600">No results found.</p>
        )}
      </CardContent>
    </Card>
  </div>
  );  
}



const data = {
  "Classroom": [
    { "building": "Main", "roomNumber": "101", "capacity": 30 },
    { "building": "Science", "roomNumber": "202", "capacity": 50 },
    { "building": "Arts", "roomNumber": "301", "capacity": 25 },
    { "building": "Engineering", "roomNumber": "401", "capacity": 40 },
    { "building": "Business", "roomNumber": "501", "capacity": 35 },
    { "building": "Law", "roomNumber": "601", "capacity": 45 },
    { "building": "Medicine", "roomNumber": "701", "capacity": 55 },
    { "building": "Library", "roomNumber": "801", "capacity": 20 },
    { "building": "Gym", "roomNumber": "901", "capacity": 60 },
    { "building": "Dormitory", "roomNumber": "1001", "capacity": 100 }
  ],
  "Department": [
    { "deptName": "Computer Science", "building": "Main", "budget": 500000 },
    { "deptName": "Mathematics", "building": "Science", "budget": 300000 },
    { "deptName": "Physics", "building": "Arts", "budget": 400000 },
    { "deptName": "Engineering", "building": "Engineering", "budget": 600000 },
    { "deptName": "Business", "building": "Business", "budget": 450000 },
    { "deptName": "Law", "building": "Law", "budget": 350000 },
    { "deptName": "Medicine", "building": "Medicine", "budget": 700000 },
    { "deptName": "Library Science", "building": "Library", "budget": 200000 },
    { "deptName": "Physical Education", "building": "Gym", "budget": 250000 },
    { "deptName": "Residential Life", "building": "Dormitory", "budget": 150000 }
  ],
  "Course": [
    { "courseId": "CS101", "title": "Introduction to Computer Science", "deptName": "Computer Science", "credits": 3 },
    { "courseId": "MATH101", "title": "Calculus I", "deptName": "Mathematics", "credits": 4 },
    { "courseId": "PHYS101", "title": "General Physics", "deptName": "Physics", "credits": 3 },
    { "courseId": "ENG101", "title": "Introduction to Engineering", "deptName": "Engineering", "credits": 3 },
    { "courseId": "BUS101", "title": "Introduction to Business", "deptName": "Business", "credits": 3 },
    { "courseId": "LAW101", "title": "Introduction to Law", "deptName": "Law", "credits": 3 },
    { "courseId": "MED101", "title": "Introduction to Medicine", "deptName": "Medicine", "credits": 3 },
    { "courseId": "LIB101", "title": "Introduction to Library Science", "deptName": "Library Science", "credits": 3 },
    { "courseId": "PE101", "title": "Introduction to Physical Education", "deptName": "Physical Education", "credits": 3 },
    { "courseId": "RL101", "title": "Introduction to Residential Life", "deptName": "Residential Life", "credits": 3 }
  ],
  "Instructor": [
    { "id": "I001", "name": "Alice Smith", "deptName": "Computer Science", "salary": 80000 },
    { "id": "I002", "name": "Bob Johnson", "deptName": "Mathematics", "salary": 75000 },
    { "id": "I003", "name": "Charlie Brown", "deptName": "Physics", "salary": 72000 },
    { "id": "I004", "name": "Diana Prince", "deptName": "Engineering", "salary": 85000 },
    { "id": "I005", "name": "Evan Davis", "deptName": "Business", "salary": 78000 },
    { "id": "I006", "name": "Fiona Green", "deptName": "Law", "salary": 82000 },
    { "id": "I007", "name": "George Harris", "deptName": "Medicine", "salary": 90000 },
    { "id": "I008", "name": "Hannah White", "deptName": "Library Science", "salary": 70000 },
    { "id": "I009", "name": "Ian Black", "deptName": "Physical Education", "salary": 65000 },
    { "id": "I010", "name": "Jack Brown", "deptName": "Residential Life", "salary": 60000 }
  ],
  "Section": [
    { "courseId": "CS101", "secId": "001", "semester": "Fall", "year": 2023, "building": "Main", "roomNumber": "101", "timeSlotId": "T01" },
    { "courseId": "MATH101", "secId": "001", "semester": "Fall", "year": 2023, "building": "Science", "roomNumber": "202", "timeSlotId": "T02" },
    { "courseId": "PHYS101", "secId": "001", "semester": "Fall", "year": 2023, "building": "Arts", "roomNumber": "301", "timeSlotId": "T03" },
    { "courseId": "ENG101", "secId": "001", "semester": "Fall", "year": 2023, "building": "Engineering", "roomNumber": "401", "timeSlotId": "T04" },
    { "courseId": "BUS101", "secId": "001", "semester": "Fall", "year": 2023, "building": "Business", "roomNumber": "501", "timeSlotId": "T05" },
    { "courseId": "LAW101", "secId": "001", "semester": "Fall", "year": 2023, "building": "Law", "roomNumber": "601", "timeSlotId": "T06" },
    { "courseId": "MED101", "secId": "001", "semester": "Fall", "year": 2023, "building": "Medicine", "roomNumber": "701", "timeSlotId": "T07" },
    { "courseId": "LIB101", "secId": "001", "semester": "Fall", "year": 2023, "building": "Library", "roomNumber": "801", "timeSlotId": "T08" },
    { "courseId": "PE101", "secId": "001", "semester": "Fall", "year": 2023, "building": "Gym", "roomNumber": "901", "timeSlotId": "T09" },
    { "courseId": "RL101", "secId": "001", "semester": "Fall", "year": 2023, "building": "Dormitory", "roomNumber": "1001", "timeSlotId": "T10" }
  ],
  "Teaches": [
    { "id": "I001", "courseId": "CS101", "secId": "001", "semester": "Fall", "year": 2023 },
    { "id": "I002", "courseId": "MATH101", "secId": "001", "semester": "Fall", "year": 2023 },
    { "id": "I003", "courseId": "PHYS101", "secId": "001", "semester": "Fall", "year": 2023 },
    { "id": "I004", "courseId": "ENG101", "secId": "001", "semester": "Fall", "year": 2023 },
    { "id": "I005", "courseId": "BUS101", "secId": "001", "semester": "Fall", "year": 2023 },
    { "id": "I006", "courseId": "LAW101", "secId": "001", "semester": "Fall", "year": 2023 },
    { "id": "I007", "courseId": "MED101", "secId": "001", "semester": "Fall", "year": 2023 },
    { "id": "I008", "courseId": "LIB101", "secId": "001", "semester": "Fall", "year": 2023 },
    { "id": "I009", "courseId": "PE101", "secId": "001", "semester": "Fall", "year": 2023 },
    { "id": "I010", "courseId": "RL101", "secId": "001", "semester": "Fall", "year": 2023 }
  ],
  "Student": [
    { "id": "S001", "name": "David Wilson", "deptName": "Computer Science", "totCred": 60 },
    { "id": "S002", "name": "Eva Adams", "deptName": "Mathematics", "totCred": 30 },
    { "id": "S003", "name": "Frank Lee", "deptName": "Physics", "totCred": 45 },
    { "id": "S004", "name": "Grace Kim", "deptName": "Engineering", "totCred": 50 },
    { "id": "S005", "name": "Hannah Brown", "deptName": "Business", "totCred": 40 },
    { "id": "S006", "name": "Isaac Green", "deptName": "Law", "totCred": 35 },
    { "id": "S007", "name": "Jack White", "deptName": "Medicine", "totCred": 55 },
    { "id": "S008", "name": "Karen Black", "deptName": "Library Science", "totCred": 25 },
    { "id": "S009", "name": "Liam Blue", "deptName": "Physical Education", "totCred": 20 },
    { "id": "S010", "name": "Mia Brown", "deptName": "Residential Life", "totCred": 15 }
  ],
  "Takes": [
    { "id": "S001", "courseId": "CS101", "secId": "001", "semester": "Fall", "year": 2023, "grade": "A" },
    { "id": "S002", "courseId": "MATH101", "secId": "001", "semester": "Fall", "year": 2023, "grade": "B+" },
    { "id": "S003", "courseId": "PHYS101", "secId": "001", "semester": "Fall", "year": 2023, "grade": "A-" },
    { "id": "S004", "courseId": "ENG101", "secId": "001", "semester": "Fall", "year": 2023, "grade": "B" },
    { "id": "S005", "courseId": "BUS101", "secId": "001", "semester": "Fall", "year": 2023, "grade": "A" },
    { "id": "S006", "courseId": "LAW101", "secId": "001", "semester": "Fall", "year": 2023, "grade": "B-" },
    { "id": "S007", "courseId": "MED101", "secId": "001", "semester": "Fall", "year": 2023, "grade": "A+" },
    { "id": "S008", "courseId": "LIB101", "secId": "001", "semester": "Fall", "year": 2023, "grade": "B+" },
    { "id": "S009", "courseId": "PE101", "secId": "001", "semester": "Fall", "year": 2023, "grade": "C" },
    { "id": "S010", "courseId": "RL101", "secId": "001", "semester": "Fall", "year": 2023, "grade": "B" }
  ],
  "Advisor": [
    { "sID": "S001", "iID": "I001" },
    { "sID": "S002", "iID": "I002" },
    { "sID": "S003", "iID": "I003" },
    { "sID": "S004", "iID": "I004" },
    { "sID": "S005", "iID": "I005" },
    { "sID": "S006", "iID": "I006" },
    { "sID": "S007", "iID": "I007" },
    { "sID": "S008", "iID": "I008" },
    { "sID": "S009", "iID": "I009" },
    { "sID": "S010", "iID": "I010" }
  ],
  "TimeSlot": [
    { "timeSlotId": "T01", "day": "Monday", "startTime": "09:00", "endTime": "10:30" },
    { "timeSlotId": "T02", "day": "Tuesday", "startTime": "11:00", "endTime": "12:30" },
    { "timeSlotId": "T03", "day": "Wednesday", "startTime": "13:00", "endTime": "14:30" },
    { "timeSlotId": "T04", "day": "Thursday", "startTime": "14:00", "endTime": "15:30" },
    { "timeSlotId": "T05", "day": "Friday", "startTime": "10:00", "endTime": "11:30" },
    { "timeSlotId": "T06", "day": "Saturday", "startTime": "09:00", "endTime": "10:30" },
    { "timeSlotId": "T07", "day": "Sunday", "startTime": "11:00", "endTime": "12:30" },
    { "timeSlotId": "T08", "day": "Monday", "startTime": "14:00", "endTime": "15:30" },
    { "timeSlotId": "T09", "day": "Tuesday", "startTime": "16:00", "endTime": "17:30" },
    { "timeSlotId": "T10", "day": "Wednesday", "startTime": "18:00", "endTime": "19:30" }
  ],
  "Prerequisites": [
    { "courseId": "CS102", "prereqId": "CS101" },
    { "courseId": "MATH201", "prereqId": "MATH101" },
    { "courseId": "PHYS201", "prereqId": "PHYS101" },
    { "courseId": "ENG201", "prereqId": "ENG101" },
    { "courseId": "BUS201", "prereqId": "BUS101" },
    { "courseId": "LAW201", "prereqId": "LAW101" },
    { "courseId": "MED201", "prereqId": "MED101" },
    { "courseId": "LIB201", "prereqId": "LIB101" },
    { "courseId": "PE201", "prereqId": "PE101" },
    { "courseId": "RL201", "prereqId": "RL101" }
  ]
}