import React, { useRef, useEffect } from "react";

export default function Paypal(props) {
  const paypal = useRef();

  console.log(props.tongTien)
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Gear",
                amount: {
                  currency_code: "USD",
                  value: Number((props.tongTien)/23500).toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          alert("Thanh toán online thành công!");
          // this.props.sCheckout(false)
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [props]);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}