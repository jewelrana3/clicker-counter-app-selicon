import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdsControlModal({
  trigger,
  id,
}: {
  trigger: React.ReactNode;
  id?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="bg-white rounded-xl min-w-xl  max-w-xl w-full  overflow-y-auto">
        <h1 className="text-center text-xl text-black font-medium">
          {id ? "Add plan" : "Edit Plan"}
        </h1>
        <div>
          <Label className="mb-2 text-[#636363] font-medium text-lg">
            Ads Price
          </Label>
          <Input type="number" placeholder="enter your price" />
        </div>

        <div>
          <Label className="mb-2 text-[#636363] text-lg">Duration</Label>
          {/* <Select>
            <SelectTrigger className="w-full rounded-full !h-12">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
          <Input type="text" placeholder="enter your duration" />
        </div>

        <Button className="bg-[#E40004]">Set</Button>
      </DialogContent>
    </Dialog>
  );
}
