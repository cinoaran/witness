**VSC Extensions needed**

- Auto Rename Tag
- Code Spell Checker
- Codeium
- Console Ninja
- ES7+React/Redux/React-Native snippets
- Multiple cursor case preserve
- ES Lint
- Prettier Code formatter
- Prisma
- Tailwind CSS IntelliSense

**VSC Settings /Preferences/Settings**

- Files Associations: Set Item:\*.css & Value:tailwindcss
- Editor Quick Suggestion for tailwindCss Autocomplete: Set Item:strings and Value:on

**VSC Packages & EsLint Prettier Settings**

- "typescript": "^5", "react": "^18",
- "react-dom": "^18", "next": "14.2.2",
- "@nextui-org/react": "^2.4.6",
- "framer-motion": "^11.3.12",
- "react-icons": "^5.2.1"

**package.json DEV**

- "typescript": "^5",
- "@types/node": "^20",
- "@types/react": "^18",
- "@types/react-dom": "^18",
- "postcss": "^8",
- "tailwindcss": "^3.4.1",
- "eslint": "^8",
- "eslint-config-next": "^14.2.2",
- "eslint-config-prettier": "^9.1.0",
- "prettier": "^3.3.3",
- "prettier-plugin-tailwindcss": "^0.6.5"

**Create prettier-config.js file outside of src**

```js
module.exports = { plugins: ["prettier-plugin-tailwindcss"] };
```

- Search for default formatter in Settings & Take

```js
Prettier Code formatter
```

- VSC needs reload !!!

**Add prettier in .eslintrc.json**

```js
"extends": {["next/core-web-vitals", "prettier"]};
```

**Extend tailwind.config.ts to include NEXT UI**

```js
import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;

```

- Create components/provider.tsx module

```js
import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Provider;

```

- Set up Provider at layout.tsx

```js
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}

```
