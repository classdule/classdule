import { test, expect } from "vitest";
import {isPast} from 'date-fns';

import { getPastDate } from "./get-past-date";

test('Should return a past date', () => {
  expect(isPast(getPastDate())).toBeTruthy();
});