/**supabaseのユーザー情報から取得した情報を元にuserに登録されているuserIdとbabyIdを返す
 */
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";
export const getUserAndBabyIds = async (token: string) => {
  const prisma = await buildPrisma();
  const { data, error } = await supabase.auth.getUser(token);
  if (error) throw new Error("Unauthorized");
  const user = await prisma.user.findUnique({
    where: {
      supabaseUserId: data?.user?.id,
    },
    include: {
      baby: true,
    },
  });
  if (!user || !user.baby) throw new Error("User not found");

  return { babyId: user.baby.id, userId: user.id };
};
