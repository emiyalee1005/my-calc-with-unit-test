import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import HelloWorld from "../HelloWorld.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(HelloWorld, { props: { msg: "Hello Vitest" } });
    const testDom = wrapper.element.querySelector(".test");
    if (testDom) {
      testDom.innerHTML = "TEST";
      expect(testDom.innerHTML).toContain("TEST");
    } else {
      throw new Error("TEST DOM IS NOT FOUND");
    }

    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
