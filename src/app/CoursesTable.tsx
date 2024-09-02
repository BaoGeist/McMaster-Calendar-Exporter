import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCourseContext } from "./context/CourseContext";

function CoursesTable() {
  const { courses } = useCourseContext();

  return (
    courses.length > 0 && (
      <Table className="hidden md:block mb-4">
        <TableHeader>
          <TableRow>
            <TableHead>Class Details</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Facility ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course, i) => (
            <TableRow key={i}>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.startDate}</TableCell>
              <TableCell>{course.startTime}</TableCell>
              <TableCell>{course.endTime}</TableCell>
              <TableCell>{course.endDate}</TableCell>
              <TableCell>{course.frequency}</TableCell>
              <TableCell>{course.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  );
}
export default CoursesTable;
