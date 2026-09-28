import Loading from "../../../ui/Loading";
import PaginationBtns from "../../../ui/Pagination";
import Table from "../../../ui/Table";
import toLocalDateShort from "../../../utils/toLocalDateShort";
import toPersianNumber from "../../../utils/toPersianNumber";
import { useGetUsers } from "./useGetUsers";

function Users() {
  const { isLoading, users } = useGetUsers();

  return (
    <section className="mx-auto w-full max-w-7xl">

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-800 sm:text-2xl">
            کاربران
          </h2>
        </div>
      </div>

      {users?.users.length == 0 ?

        <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
          <h3 className="mt-4 text-lg font-bold text-slate-700">
            کاربری وجود ندارد
          </h3>
        </div>
        :
        <>
          {isLoading ? <div className="flex items-center justify-center"><Loading size={40} /></div> :
            <div className="overflow-x-auto bg-white shadow rounded-2xl">
              <Table>
                <Table.Header>
                  <Table.RowHead>
                    <th className="w-20 text-center px-5 py-4 text-xs font-bold text-slate-400">
                      #
                    </th>

                    <th className="px-5 text-center py-4 text-xs font-bold text-slate-400">
                      نام
                    </th>

                    <th className="px-5 text-center py-4 text-xs font-bold text-slate-400">
                      شماره موبایل
                    </th>

                    <th className="w-32 text-center px-5 py-4 text-center text-xs font-bold text-slate-400">
                      ایمیل
                    </th>

                    <th className="w-32 text-center px-5 py-4 text-center text-xs font-bold text-slate-400">
                      نقش
                    </th>

                    <th className="w-32 text-center px-5 py-4 text-center text-xs font-bold text-slate-400">
                      تاریخ ثبت نام
                    </th>
                  </Table.RowHead>
                </Table.Header>
                <Table.Body>
                  {users?.users.map((user, index) => {
                    return (
                      <Table.RowBody key={user?._id}>
                        <td className="px-5 py-4 text-center">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-xs font-bold text-slate-400">
                            {index + 1}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span className="text-sm font-bold text-slate-700">
                            {user?.username}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span className="text-sm text-slate-500">
                            {toPersianNumber(String(user?.mobile))}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span className="text-sm text-slate-500">
                            {user?.email}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span className="text-sm text-slate-500">
                            {user?.role == "admin" ? "مدیر" : "کاربر"}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span className="text-sm text-slate-500">
                            {toLocalDateShort(user ? user?.createdAt : "-")}
                          </span>
                        </td>
                      </Table.RowBody>
                    )
                  })}
                </Table.Body>
              </Table>
            </div>
          }
        </>
      }
      {users && users.totalUsers != 0 &&
        <PaginationBtns currentPage={users ? users?.currentPage : 1} lastPage={users ? users?.totalPages : 1} />
      }
    </section>
  )
}

export default Users;