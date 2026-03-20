import { useRef, useState } from "react";
import {
  IconButton,
  Menu,
  MenuHeader,
  Icon,
  MenuItem,
  MenuItemText,
  MenuDivider,
} from "@ringcentral/spring-ui";
import { SettingsMd, ThemesMd } from "@ringcentral/spring-icon";
import {
  usePresentationConfig,
  type ThemeOption,
  type EnvironmentOption,
  type UserRole,
} from "./PresentationConfigContext"

export function PresentationConfigFab() {
  const fabRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const {
    themeOption,
    setThemeOption,
    environment,
    setEnvironment,
    userRole,
    setUserRole,
  } = usePresentationConfig();

  const handleClose = () => setOpen(false);

  const themeItems: { label: string; value: ThemeOption }[] = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "High Contrast", value: "highContrast" },
  ];

  const envItems: { label: string; value: EnvironmentOption }[] = [
    { label: "Full Screen", value: "fullscreen" },
    { label: "macOS", value: "macos" },
    { label: "Windows", value: "windows" },
  ];

  const userItems: { label: string; value: UserRole }[] = [
    { label: "Admin", value: "admin" },
    { label: "Agent", value: "agent" },
  ];

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "50%",
          right: 24,
          transform: "translateY(-50%)",
          zIndex: 9999,
        }}
      >
        <IconButton
          ref={fabRef}
          symbol={SettingsMd}
          size="xlarge"
          shape="squircle"
          variant="contained"
          aria-label="Presentation configuration"
          onClick={() => setOpen((prev) => !prev)}
        />
      </div>
      <Menu
        open={open}
        anchorEl={fabRef.current}
        onClose={handleClose}
        placement="left"
        PopperProps={{ offset: 8 }}
      >
        <MenuHeader
          divider={false}
          className="justify-start px-4 typography-labelSemiBold h-8 text-neutral-b2"
        >
          Theme
        </MenuHeader>
        {themeItems.map((item) => (
          <MenuItem
            key={item.value}
            selected={themeOption === item.value}
            onClick={() => {
              setThemeOption(item.value);
              handleClose();
            }}
          >
            <MenuItemText>{item.label}</MenuItemText>
          </MenuItem>
        ))}

        <MenuDivider />
        <MenuHeader
          divider={false}
          className="justify-start px-4 typography-labelSemiBold h-8 text-neutral-b2"
        >
          Environment
        </MenuHeader>
        {envItems.map((item) => (
          <MenuItem
            key={item.value}
            selected={environment === item.value}
            onClick={() => {
              setEnvironment(item.value);
              handleClose();
            }}
          >
            <MenuItemText>{item.label}</MenuItemText>
          </MenuItem>
        ))}

        <MenuDivider />
        <MenuHeader
          divider={false}
          className="justify-start px-4 typography-labelSemiBold h-8 text-neutral-b2"
        >
          User
        </MenuHeader>
        {userItems.map((item) => (
          <MenuItem
            key={item.value}
            selected={userRole === item.value}
            onClick={() => {
              setUserRole(item.value);
              handleClose();
            }}
          >
            <MenuItemText>{item.label}</MenuItemText>
          </MenuItem>
        ))}

        <MenuDivider />
        <MenuHeader
          divider={false}
          className="justify-start px-4 typography-labelSemiBold h-8 text-neutral-b2"
        >
          Flow
        </MenuHeader>
        <MenuItem disabled>Add your flow here</MenuItem>
      </Menu>
    </>
  );
}
