import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FileText, Upload, Download, X } from 'lucide-react';

interface FileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: () => void;
  onExport: () => void;
}

export default function FileDialog({
  isOpen,
  onClose,
  onImport,
  onExport,
}: FileDialogProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6 shadow-xl transition-all">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white mb-4 flex items-center gap-2"
                >
                  <FileText className="w-5 h-5 text-blue-400" />
                  ניהול קבצים
                </Dialog.Title>

                <div className="mt-4 space-y-4">
                  <button
                    onClick={() => {
                      onImport();
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-gray-700 hover:bg-gray-600 
                             rounded-lg text-white transition-colors"
                  >
                    <Upload className="w-5 h-5 text-blue-400" />
                    <div className="text-right">
                      <div className="font-medium">ייבא טקסט</div>
                      <div className="text-sm text-gray-400">
                        ייבא טקסט מקובץ TXT או JSON
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onExport();
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-gray-700 hover:bg-gray-600 
                             rounded-lg text-white transition-colors"
                  >
                    <Download className="w-5 h-5 text-green-400" />
                    <div className="text-right">
                      <div className="font-medium">ייצא טקסט</div>
                      <div className="text-sm text-gray-400">
                        שמור את הטקסט וההגדרות לקובץ
                      </div>
                    </div>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}