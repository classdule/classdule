import { Prisma } from "@prisma/client";
import { isClassroomOpen } from "../src/services/classroom";

describe('Some classroom tests', () => {
    const classroomMock: Prisma.ClassroomScheduleGetPayload<{}> = {
        classroomId: '1111',
        endsAt: new Date(),
        startsAt: new Date(),
        weekDay: 3, // Wednesday
        id: '2222'
    }
    it('Should successfully return if the classroom is open', async ()=> {
        expect(isClassroomOpen(
            classroomMock, 
            new Date(2022, 8, 7) // 07-09-2022(Wednesday)
        )).toBe(true)
    })
    it('Should successfully return if the classroom is closed', async ()=> {
        expect(isClassroomOpen(
            classroomMock,
            new Date(2022, 10, 10) // 10-11-2022(Thursday)
        )).toBe(false)
    })
})