"use client";

import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

// icons
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColorColumn } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";

// cell action props
type CellActionProps = {
  data: ColorColumn;
};

// cell action
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  // navigation
  const router = useRouter();
  const params = useParams();

  // states
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // copy color id to clipboard
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Color Id copied to the clipboard.");
  };

  // delete color
  const onDelete = async () => {
    try {
      // show loading
      setLoading(true);
      // send api request to delete color
      await axios.delete(`/api/${params.storeId}/colors/${data.id}`);

      // refresh page on success
      router.refresh();

      // show success message
      toast.success("Color deleted successfully.");
    } catch (error) {
      // show error message
      toast.error("Make sure you removed all products using this color first.");
    } finally {
      // hide loader
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {/* color delete alert modal */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <DropdownMenu>
        {/* open menu button */}
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        {/* actions */}
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {/* copy color id */}
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>

          {/* delete color data */}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
