"use client";

import { X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useI18n } from "@/lib/i18n";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import CheckoutForm from "@/components/sections/CheckoutForm";

interface OrderDrawerContextValue {
  openOrderDrawer: () => void;
}

const OrderDrawerContext = createContext<OrderDrawerContextValue | null>(null);

export function useOrderDrawer() {
  const context = useContext(OrderDrawerContext);
  if (!context) {
    throw new Error("useOrderDrawer must be used within OrderDrawerProvider");
  }
  return context;
}

export function OrderDrawerProvider({ children }: { children: ReactNode }) {
  const { t: content } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const focusTrapRef = useFocusTrap(isOpen);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const openOrderDrawer = useCallback(() => setIsOpen(true), []);

  // Focus management: move focus into the drawer, restore on close
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setTimeout(() => {
        focusTrapRef.current?.focus();
      }, 0);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [isOpen, focusTrapRef]);

  // Escape closes; background scrolling locked while open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <OrderDrawerContext.Provider value={{ openOrderDrawer }}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-end animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
          role="presentation"
        >
          <div
            ref={focusTrapRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-drawer-title"
            className="bg-white h-full w-full max-w-lg shadow-xl overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 id="order-drawer-title" className="text-xl font-bold text-royal-blue">
                  {content.hero.orderNowText}
                </h3>
                <p className="text-charcoal-muted text-xs mt-0.5">
                  $50/bottle · {content.hero.saveText3Plus} 3+ · {content.hero.saveText12Plus} 12+ · {content.hero.saveText24Plus} 24+
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={content.accessibility.closeDialog}
              >
                <X className="w-5 h-5 text-charcoal" aria-hidden="true" />
              </button>
            </div>
            <div className="p-6">
              <CheckoutForm />
            </div>
          </div>
        </div>
      )}
    </OrderDrawerContext.Provider>
  );
}
