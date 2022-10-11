import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import MyCalc from "../MyCalc.vue";

function sleep(d?: number) {
  return new Promise((r) => setTimeout(r, d));
}

describe("MyCalc", () => {
  it("renders properly", async () => {
    const wrapper = mount(MyCalc, { props: {} });
    const domMap: Record<string, HTMLButtonElement> = {};

    for (let k = 0; k < 10; ++k) {
      const targetDom = wrapper.element.querySelector(`#num-${k}`);
      if (!targetDom) throw new Error(`NUM ${k} IS NOT FOUND`);
      domMap[k] = targetDom as HTMLButtonElement;
    }

    const plusDom = wrapper.element.querySelector("#btn-plus");
    if (!plusDom) throw new Error(`PLUS IS NOT FOUND`);
    domMap["+"] = plusDom as HTMLButtonElement;

    const minusDom = wrapper.element.querySelector("#btn-minus");
    if (!minusDom) throw new Error(`MINUS IS NOT FOUND`);
    domMap["-"] = minusDom as HTMLButtonElement;

    const delDom = wrapper.element.querySelector("#btn-del");
    if (!delDom) throw new Error(`DEL IS NOT FOUND`);
    domMap["del"] = delDom as HTMLButtonElement;

    domMap["1"].click();
    domMap["+"].click();
    domMap["1"].click();
    domMap["-"].click();
    domMap["1"].click();

    await sleep();

    const exprDom = wrapper.element.querySelector(".expr");
    expect(exprDom?.innerHTML).toEqual("1+1-1");

    const resultNumberDom = wrapper.element.querySelector(".result-number");
    expect(resultNumberDom?.innerHTML).toEqual("1");

    // const testDom = wrapper.element.querySelector(".test");
    // if (testDom) {
    //   testDom.innerHTML = "TEST";
    //   expect(testDom.innerHTML).toContain("TEST");
    // } else {
    //   throw new Error("TEST DOM IS NOT FOUND");
    // }
    //
    // expect(wrapper.text()).toContain("Hello Vitest");
  });
});
