

export default function Inbox() {

    return (
        <div className="md:px-[8%] p-[3%] min-h-[100vh]">
            <div className="flex justify-between items-center h-[80px] border border-transparent border-b-gray-200 dark:border-b-gray-300/[0.1] ">
                <h2 className="text-primary text-semibold uppercase">Inbox</h2>
                <p>0 new messages</p>
            </div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 py-[40px] ">
                <p></p>
            </div>
        </div>
    )
}