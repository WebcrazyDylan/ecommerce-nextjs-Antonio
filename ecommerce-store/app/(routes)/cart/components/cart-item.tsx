"use client";

import Image from "next/image";
import Link from "next/link";

// icons
import { X } from "lucide-react";

// components
import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";

// hooks
import useCart from "@/hooks/use-cart";

// types
import { Product } from "@/types";

// cart item props
type CartItemProps = {
  data: Product;
};

// cart item
const CartItem: React.FC<CartItemProps> = ({ data }) => {
  // states
  const cart = useCart();

  // cart item remove event handler
  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex py-6 border-b">
      {/* product image */}
      <Link
        href={`/product/${data?.id}`}
        className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48"
      >
        <Image
          fill
          src={data.images[0].url}
          alt={data.name}
          className="object-cover object-center"
        />
      </Link>

      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        {/* remove from cart icon */}
        <div className="absolute z-10 right-0 top-0" title="Remove from Cart">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>

        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          {/* product name */}
          <Link href={`/product/${data?.id}`} className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.name}</p>
          </Link>

          {/* product info */}
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.color.name}</p>
            <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">
              {data.size.name}
            </p>
          </div>

          {/* product price */}
          <Currency value={data.price} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
