import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Homepage = () => {
  return (
    <div className="flex flex-col items-center">
      <main className="mt-16 w-[1000px]">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          <span className="text-primary">McMaster</span> Schedule{" "}
          <span className="text-xl text-primary">2</span> Google Calendar
        </h1>

        <p className="text-lg mt-4">
          Copying your course schedule to Google Calendar through the Reddit
          link is broken. Not sure when theyre going to fix it but this is an
          alternative until that works again.
        </p>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};
export default Homepage;
