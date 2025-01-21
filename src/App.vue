<script setup lang="ts">
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ref } from "vue";

const ApiKey: string = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(ApiKey);

const generatedText = ref<string>("");

async function run() {
  generatedText.value = "Generating Content...";
  console.log("Generating Content...");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = "How to change the seed of a prompt using the google gemini 1.5 api"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  generatedText.value = response.text();
  console.log("Content Generated.")
}

</script>

<template>
<section class="section">
  <h1>Idea Generator 0.5</h1>
  <p>Generate ideas for your next project</p>

  <button @click="run">Generate Idea</button>

  <div class="generatedText">
    {{ generatedText }}
  </div>
</section>
</template>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.generatedText {
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 80%;
  text-align: left;
}

</style>
