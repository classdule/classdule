import { Checkin } from "../../../../app/entities/checkin";

export class CheckinHttpMapper {
  static toHttp(checkin: Checkin) {
    return {
      id: checkin.id,
      createdAt: checkin.createdAt,
      userId: checkin.userId,
      verified: checkin.verified,
    };
  }
}
