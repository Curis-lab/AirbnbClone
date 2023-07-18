import { Listing, User } from "@prisma/client";

export type SafeUser = Omit<User,"createAt"|"updatedAt"|"emailVeried">&{
    createdAt: string;
    updatedAt: string,
    emailVerified: string | null;
}

export type SafeListing = Omit<
    Listing,
    "createdAt"
>& {
    createdAt: string;
}

