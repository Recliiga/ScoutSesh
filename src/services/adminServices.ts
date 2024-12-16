import connectDB from "@/db/connectDB";
import AthleteEvaluation, {
  AthleteEvaluationType,
} from "@/db/models/AthleteEvaluation";
import AthleteEvaluationOrder, {
  AthleteEvaluationOrderType,
} from "@/db/models/AthleteEvaluationOrder";
import GroupClass, { GroupClassType } from "@/db/models/GroupClass";
import Order, { OrderType } from "@/db/models/Order";
import Organization, { OrganizationType } from "@/db/models/Organization";
import User, { UserType } from "@/db/models/User";

export async function fetchAdminData() {
  try {
    await connectDB();
    const organizations: OrganizationType[] = JSON.parse(
      JSON.stringify(
        await Organization.find().populate({
          path: "user",
          select: "firstName lastName profilePicture",
        }),
      ),
    );

    const users: UserType[] = JSON.parse(
      JSON.stringify(
        await User.find().populate({
          path: "organization",
          select: "name logo",
        }),
      ),
    );

    const groupClasses: GroupClassType[] = JSON.parse(
      JSON.stringify(
        await GroupClass.find()
          .populate({
            path: "user",
            select: "firstName lastName profilePicture",
          })
          .populate({
            path: "coaches",
            select: "firstName lastName profilePicture",
            populate: { path: "organization", select: "name" },
          }),
      ),
    );

    const classOrders: OrderType[] = JSON.parse(
      JSON.stringify(
        await Order.find()
          .populate({
            path: "user",
            select: "firstName lastName profilePicture",
          })
          .populate({
            path: "course",
            select: "_id",
          }),
      ),
    );

    const evaluationOrders: AthleteEvaluationOrderType[] = JSON.parse(
      JSON.stringify(
        await AthleteEvaluationOrder.find().populate({
          path: "athlete coach",
          select: "firstName lastName profilePicture",
          populate: { path: "organization", select: "name logo" },
        }),
      ),
    );

    const evaluations: AthleteEvaluationType[] = JSON.parse(
      JSON.stringify(
        await AthleteEvaluation.find()
          .populate({
            path: "athlete coach",
            select: "firstName lastName profilePicture",
            populate: { path: "organization", select: "name logo" },
          })
          .populate({ path: "order", select: "totalPrice" }),
      ),
    );

    const adminData = {
      users,
      organizations,
      groupClasses,
      classOrders,
      evaluationOrders,
      evaluations,
    };
    return { adminData, error: null };
  } catch (error) {
    return { adminData: null, error: (error as Error).message };
  }
}

export async function fetchEvaluationsByOrganization(organizationId: string) {
  try {
    await connectDB();
    const allEvaluationOrders: AthleteEvaluationOrderType[] = JSON.parse(
      JSON.stringify(
        await AthleteEvaluationOrder.find().populate({
          path: "athlete coach",
          select: "firstName lastName profilePicture",
          populate: { path: "organization", select: "name logo" },
        }),
      ),
    );

    const evaluations = allEvaluationOrders.filter(
      (order) => order.coach.organization?._id === organizationId,
    );
    return { evaluations, error: null };
  } catch (error) {
    return { evaluations: null, error: (error as Error).message };
  }
}

export async function fetchOrganizationData(organizationId: string) {
  try {
    await connectDB();

    const organization: OrganizationType | null = JSON.parse(
      JSON.stringify(
        await Organization.findById(organizationId).populate("user"),
      ),
    );

    if (!organization) throw new Error("Invalid organization ID");

    const teamMembers: UserType[] = JSON.parse(
      JSON.stringify(
        await User.find({
          organization: organizationId,
        }),
      ),
    );

    const courses: GroupClassType[] = JSON.parse(
      JSON.stringify(
        await GroupClass.find({
          user: organization.user._id,
        }),
      ),
    );

    const organizationData = { organization, teamMembers, courses };

    return { organizationData, error: null };
  } catch (err) {
    return { organizationData: null, error: (err as Error).message };
  }
}
