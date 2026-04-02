import React, { useEffect } from "react";
import { toast } from "sonner";

const PaymentSuccess = () => {

  useEffect(() => {
    toast.success("Payment successful! Credits will be added shortly.");
  }, []);

  return (
    <div className="h-screen flex items-center justify-center text-white text-5xl">
      ✅ Payment Successful!  <br /><br />
      <br />
      Please wait while we update your credits...
    </div>
  );
};

export default PaymentSuccess;