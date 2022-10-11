import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import MyCalc from "../MyCalc.vue";
import sleep from "../../libs/sleep";

describe("MyCalc", () => {
  it("renders properly", async () => {
    const wrapper = mount(MyCalc, { props: {} });
    const domMap: Record<string, HTMLDivElement> = {};

    // check num btn
    for (let k = 0; k < 10; ++k) {
      const targetDom = wrapper.element.querySelector<HTMLDivElement>(
        `#num-${k}`
      );
      if (!targetDom) throw new Error(`NUM ${k} IS NOT FOUND`);
      domMap[k] = targetDom;
    }

    // check plus btn
    const plusDom = wrapper.element.querySelector<HTMLDivElement>("#btn-plus");
    if (!plusDom) throw new Error(`PLUS IS NOT FOUND`);
    domMap["+"] = plusDom;

    // check minus btn
    const minusDom =
      wrapper.element.querySelector<HTMLDivElement>("#btn-minus");
    if (!minusDom) throw new Error(`MINUS IS NOT FOUND`);
    domMap["-"] = minusDom;

    // check del btn
    const delDom = wrapper.element.querySelector<HTMLDivElement>("#btn-del");
    if (!delDom) throw new Error(`DEL IS NOT FOUND`);
    domMap["del"] = delDom;

    // input expr
    domMap["1"].click();
    domMap["+"].click();
    domMap["1"].click();
    domMap["-"].click();
    domMap["1"].click();

    // wait vue to render new changed content asynchronously
    await sleep();

    // check displayed expr
    const exprDom = wrapper.element.querySelector<HTMLDivElement>(".expr");
    expect(exprDom?.innerHTML).toEqual("1+1-1");

    // check final result
    const resultNumberDom =
      wrapper.element.querySelector<HTMLDivElement>(".result-number");
    expect(resultNumberDom?.innerHTML).toEqual("1");
  });
});
