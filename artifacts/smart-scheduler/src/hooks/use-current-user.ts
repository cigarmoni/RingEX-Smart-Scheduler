import { useState } from "react";

export function useCurrentUser() {
  const [user] = useState({
    id: "u_1",
    name: "Alex Morgan",
    email: "alex.morgan@ringcentral.com",
    initials: "AM",
    avatarUrl: undefined,
  });

  return { data: user, isLoading: false };
}
