import type { Config } from "@react-router/dev/config";

export default {
   prerender: false,
   ssr: false,
   buildDirectory: 'build',
   basename: '/sigmoid-ctf-map-poc/',
} satisfies Config;
