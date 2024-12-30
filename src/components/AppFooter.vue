<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faGithub, faLinkedin, faXTwitter, faInstagram);

const socialLinks = [
  {
    href: "https://github.com/SamHillierDev",
    icon: ["fab", "github"],
    ariaLabel: "GitHub",
  },
  {
    href: "https://linkedin.com/in/samhillier",
    icon: ["fab", "linkedin"],
    ariaLabel: "LinkedIn",
  },
  {
    href: "https://x.com/Zyphaex",
    icon: ["fab", "x-twitter"],
    ariaLabel: "X",
  },
  {
    href: "https://instagram.com/Zyphaex",
    icon: ["fab", "instagram"],
    ariaLabel: "Instagram",
  },
];

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer
    class="flex flex-col gap-1 bg-[#1A224E] p-4 px-6 text-center text-white dark:bg-slate-900"
  >
    <div class="flex justify-center gap-3">
      <template v-for="link in socialLinks" :key="link.href">
        <a
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="transition hover:text-gray-400"
          :aria-label="link.ariaLabel"
        >
          <font-awesome-icon :icon="link.icon" size="lg" />
        </a>
      </template>
    </div>
    <p class="text-sm text-gray-300">
      © {{ currentYear }} Sam Hillier. All rights reserved.
    </p>
    <p class="text-sm text-gray-400">
      The Fancensus logo and all associated trademarks are owned by
      <a href="https://fancensus.com" target="_blank" rel="noopener noreferrer"
        >Fancensus</a
      >.
    </p>
  </footer>
</template>
