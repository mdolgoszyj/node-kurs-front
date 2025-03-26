import { createContext, ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface IDialogContext {
  openDialog: (title: string, content: string, action: () => void) => void;
  closeDialog: () => void;
}

const defaultContext: IDialogContext = {
    openDialog: () => {
      throw new Error("DialogContext is not initialized");
    },
    closeDialog: () => {
      throw new Error("DialogContext is not initialized");
    },
  };

export const DialogContext = createContext<IDialogContext>(defaultContext);

export function DialogProvider({ children }: { children: ReactNode }) {

  const [isOpen, setIsOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [dialogAction, setDialogAction] = useState<(()=>void) | null>();

  const openDialog = (title:string,content:string, action: () => void) => {
    setIsOpen(true)
    setDialogTitle(title);
    setDialogContent(content);
    setDialogAction(()=>action)
  }

const closeDialog = () => {
    setIsOpen(false)
    setDialogTitle("");
    setDialogContent("");
    setDialogAction(undefined)
  }

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}

      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>
              {dialogContent}
            </DialogDescription>
          </DialogHeader>

            <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Anuluj</Button>
            <Button variant="destructive" onClick={()=> {
                if (dialogAction) {
                  dialogAction();
                }
                closeDialog();
            }}>Potwierdź</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
}
