// import logo from "@/assets/logo.png";
import { getWixServerClient } from "@/lib/wix-client.server";
// import { getWixClient } from "@/lib/wix-client.base";
import { getCart } from "@/wix-api/cart";
// import SearchField from "@/components/SearchField";
// import UserButton from "@/components/UserButton";
// import { getWixServerClient } from "@/lib/wix-client.server";
// import { getCart } from "@/wix-api/cart";
// import { getCollections } from "@/wix-api/collections";
// import { getLoggedInMember } from "@/wix-api/members";
import Image from "next/image";
import Link from "next/link";
import ShoppingCartButton from "./ShoppingCartButton";
import UserButton from "@/components/UserButton";
import { getLoggedInMember } from "@/wix-api/members";
import { getCollections } from "@/wix-api/collections";
import { Suspense } from "react";
import MainNavigation from "./MainNavigation";
import SearchField from "@/components/SearchFiend";
import MobileMenu from "./MobileMenu";
// import { Suspense } from "react";
// import MainNavigation from "./MainNavigation";
// import MobileMenu from "./MobileMenu";
// import ShoppingCartButton from "./ShoppingCartButton";




// TEMP
// async function getCart() {
//     const wixClient = getWixClient()

//     try {
//         return await wixClient.currentCart.getCurrentCart()
        
//     } catch (error) {
//         if ((error as any).details.applicationError.code === "OWNED_CART_NOT_FOUND") {
//           return null
//         } else {
//             throw error;
//       }
        
//     }

// }


export default async function Navbar() {



    // TEMP
  //  const totalQuantity =
  //   cart?.lineItems?.reduce(
  //     (acc, item) => acc + (item.quantity || 0),
  //     0,
  //   ) || 0;



  const wixClient = getWixServerClient();
  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    getCollections(wixClient),
  ]);

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <Suspense>
          <MobileMenu
            collections={collections}
            loggedInMember={loggedInMember}
          />
        </Suspense>
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/" className="flex items-center gap-4">
            <Image src="/logo.png" alt="Flow Shop logo" width={40} height={40} />
            <span className="text-xl font-bold">Yuricart</span>
          </Link>
          <MainNavigation
            collections={collections}
            className="hidden lg:flex"
          />
        </div>

        {/* SEARCHBAR */}
        <SearchField className="hidden max-w-96 lg:inline right-3" />
         
          {/* USER-ICON */}
        <div className="flex items-center justify-center gap-5">
           <div className="flex items-center justify-center gap-5">
            <UserButton loggedInMember={loggedInMember}
            className="hidden lg:inline-flex"
            />    
            <ShoppingCartButton initialData={cart} />
            
          </div>
        </div>
      </div>
    </header>
  );
}
