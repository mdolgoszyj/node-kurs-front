import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { onLogout } from "@/lib/onLogout";


export function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        onLogout();
        navigate("/login")

    }
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >

                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <NavLink to="/myaccount" title="MyAccount">
                <h4 className="font-bold">Moje konto</h4>
                Re-usable components built using Radix UI and Tailwind CSS.
              </NavLink>
              <NavLink to="/settings" title="Settings">
                <h4 className="font-bold">Ustawienia</h4>
                How to install dependencies and structure your app.
              </NavLink>
              <Button variant="destructive" onClick={handleLogout}>Wyloguj się</Button>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
