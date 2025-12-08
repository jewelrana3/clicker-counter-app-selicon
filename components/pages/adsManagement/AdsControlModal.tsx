import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdsControlModal({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="bg-white rounded-xl min-w-xl  max-w-xl w-full  overflow-y-auto">
        <h1 className="text-center text-xl text-black font-medium">
          Set Your Ads Price
        </h1>
        <div>
          <Label className="mb-2 text-[#636363] font-medium text-lg">
            Ads Price
          </Label>
          <Input type="number" placeholder="enter your price" />
        </div>

        <div>
          <Label className="mb-2 text-[#636363] text-lg">Ads Time</Label>
          <Select>
            <SelectTrigger className="w-full rounded-full !h-12">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button className="bg-[#E40004]">Set</Button>
      </DialogContent>
    </Dialog>
  );
}
