<script setup lang="ts">
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ref, computed } from "vue";
import { marked } from "marked";

const ApiKey: string = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(ApiKey);

const areaOfInterest = ref<string>("");
const skillLevel = ref<string>("");
const projectScope = ref<string>("");

const generatedText = ref<string>("");
const rendered = ref<boolean>(false);

const prompt = computed(() => {
  return `Generate a creative and unique project idea
   for ${areaOfInterest.value} 
   with a skill level of ${skillLevel.value} 
   and a project scope of ${projectScope.value}.
   Create a cool name for it and use it as the title.
   Format the responde in markdown.
   Use a friendly tone and present the idea in a simple and approachable way.
   Use emojis to make it fun!`;
});

async function run() {
  generatedText.value = "Generating Content...";
  console.log("Generating Content...");
  rendered.value = true;
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const result = await model.generateContent(prompt.value);
  const response = await result.response;
  generatedText.value = response.text();
  console.log("Content Generated.")
}

const formattedText = computed(() => {
  return marked(generatedText.value);
});

</script>

<template>
<section class="section">
  <h1>Idea Generator v1.0</h1>
  <p>Generate ideas for your next project</p>

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

  <div v-if="rendered === true" class="generatedText markdown-content">
    <div v-html="formattedText"></div>
  </div>
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
