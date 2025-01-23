<script setup lang="ts">
import { ref, computed } from "vue";
import { marked } from "marked";
import { promptGemini, promptGeminiStream } from "../scripts/geminiFunctions";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin)

const areaOfInterest = ref<string>("");
const skillLevel = ref<string>("");
const projectScope = ref<string>("");

const generatedText = ref<string>("");
const rendered = ref<boolean>(false);


const systemInstructions: string = `Create a cool name for it and use it as the title.
   Format the responde in markdown.
   Use a friendly tone and present the idea in a simple and approachable way.
   Use emojis to make it fun!`;
const prompt = computed(() => {
  return `Generate a creative and unique project idea
   for ${areaOfInterest.value} 
   with a skill level of ${skillLevel.value} 
   and a project scope of ${projectScope.value}.`;
});

const formattedText = computed(() => {
  return marked(generatedText.value);
});

async function run(){
    rendered.value = true;
    generatedText.value = "Generating Content...";
    generatedText.value = await promptGemini(prompt.value, systemInstructions);
    gsap.to(window, { duration: 1, scrollTo: "#generatedText", ease: "power2" });
}

// const runStreamed = async () => {
//   generatedText.value = "Generating Streamed Content...";
//   rendered.value = true;
//   generatedText.value = "";
//   for await (const chunk of promptGeminiStream(prompt.value)) {
//     generatedText.value += chunk;
//   }
// };

</script>

<template>
<section class="section">
  <h1>Idea Generator 1.1</h1>

  <div class="options">
    <div class="option-set">
      <label>Area of Interest:</label>
      <div>
        <input type="radio" id="ai" value="AI" v-model="areaOfInterest">
        <label for="ai">AI</label>
      </div>
      <div>
        <input type="radio" id="web" value="Web Development" v-model="areaOfInterest">
        <label for="web">Web Development</label>
      </div>
      <div>
        <input type="radio" id="mobile" value="Mobile Development" v-model="areaOfInterest">
        <label for="mobile">Mobile Development</label>
      </div>
    </div>

    <div class="option-set">
      <label>Skill Level:</label>
      <div>
        <input type="radio" id="beginner" value="Beginner" v-model="skillLevel">
        <label for="beginner">Beginner</label>
      </div>
      <div>
        <input type="radio" id="intermediate" value="Intermediate" v-model="skillLevel">
        <label for="intermediate">Intermediate</label>
      </div>
      <div>
        <input type="radio" id="advanced" value="Advanced" v-model="skillLevel">
        <label for="advanced">Advanced</label>
      </div>
    </div>

    <div class="option-set">
      <label>Project Scope:</label>
      <div>
        <input type="radio" id="small" value="Small" v-model="projectScope">
        <label for="small">Small</label>
      </div>
      <div>
        <input type="radio" id="medium" value="Medium" v-model="projectScope">
        <label for="medium">Medium</label>
      </div>
      <div>
        <input type="radio" id="large" value="Large" v-model="projectScope">
        <label for="large">Large</label>
      </div>
    </div>
  </div>

  <button @click="run">Generate Idea</button>

  <div v-if="rendered === true" class="generatedText markdown-content" id="generatedText">
        <div v-html="formattedText"></div>
  </div>

  <button class="btn-primary">
    Work on this Project
  </button>
</section>
</template>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 10vh 0;
}

.generatedText {
  margin-top: 16px;
  padding: 32px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 60%;
  text-align: left;
}

.options {
  display: flex;
  gap: 32px;

  margin: 64px 0;
}

</style>
