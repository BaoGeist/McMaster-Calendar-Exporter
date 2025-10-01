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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCourseContext } from "./context/CourseContext";

// Google Calendar color IDs and their corresponding hex values (from Google Calendar API)
const CALENDAR_COLORS = [
  { id: "1", name: "Lavender", color: "#a4bdfc" },
  { id: "2", name: "Sage", color: "#7ae7bf" },
  { id: "3", name: "Grape", color: "#dbadff" },
  { id: "4", name: "Flamingo", color: "#ff887c" },
  { id: "5", name: "Banana", color: "#fbd75b" },
  { id: "6", name: "Tangerine", color: "#ffb878" },
  { id: "7", name: "Peacock", color: "#46d6db" },
  { id: "8", name: "Graphite", color: "#e1e1e1" },
  { id: "9", name: "Blueberry", color: "#5484ed" },
  { id: "10", name: "Basil", color: "#51b749" },
  { id: "11", name: "Tomato", color: "#dc2127" },
];

function CoursesTable() {
  const { courses, setCourses } = useCourseContext();

  const handleColorChange = (index: number, colorId: string) => {
    const updatedCourses = [...courses];
    updatedCourses[index] = { ...updatedCourses[index], colorId };
    setCourses(updatedCourses);
  };

  return (
    courses.length > 0 && (
      <div className="hidden md:block mb-4 w-full">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Class Details</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Facility ID</TableHead>
            <TableHead>Color</TableHead>
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
              <TableCell>
                <Select
                  value={course.colorId || "default"}
                  onValueChange={(value) =>
                    handleColorChange(i, value === "default" ? "" : value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        {course.colorId && (
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{
                              backgroundColor: CALENDAR_COLORS.find(
                                (c) => c.id === course.colorId
                              )?.color,
                            }}
                          />
                        )}
                        <span>
                          {course.colorId
                            ? CALENDAR_COLORS.find(
                                (c) => c.id === course.colorId
                              )?.name
                            : "Default"}
                        </span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">
                      <span>Default</span>
                    </SelectItem>
                    {CALENDAR_COLORS.map((color) => (
                      <SelectItem key={color.id} value={color.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: color.color }}
                          />
                          <span>{color.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </div>
    )
  );
}
export default CoursesTable;
