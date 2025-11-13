import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function NearBy() {
  return (
    <div className="w-[40%]">
      <h1 className="text-xl font-medium text-black">
        Set Your Nearby Location Range
      </h1>
      <Label htmlFor="" className="mb-2 mt-7">
        Range
      </Label>
      <Input type="text" placeholder="Enter range in meters" />

      <Button className="w-full mt-3">Set</Button>
    </div>
  );
}
