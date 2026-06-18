import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import { verifyAdminKey } from "@/lib/server/adminKey";

export const runtime = "nodejs";

type AdminRegisterBody = {
  email?: string;
  name?: string;
  password?: string;
  adminKey?: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json() as AdminRegisterBody;
    const email = body.email?.trim().toLowerCase() || "";
    const name = body.name?.trim() || "";
    const password = body.password || "";
    const adminKey = body.adminKey || "";

    if (!verifyAdminKey(adminKey)) {
      return NextResponse.json({ message: "Admin key klopt niet!" }, { status: 401 });
    }

    if (!email || !name || !password) {
      return NextResponse.json({ message: "Vul e-mail, naam en wachtwoord in." }, { status: 400 });
    }

    const payload = await getPayload({ config });
    const user = await payload.create({
      collection: "users",
      data: {
        email,
        name,
        password,
        role: "admin"
      },
      overrideAccess: true
    });

    return NextResponse.json({ doc: user, message: "Admin account aangemaakt." }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Admin registreren lukt niet.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
