export function FooterSection(){
    return(
        <>
            <footer class="bg-white rounded-lg shadow m-4 dark:bg-blue-950">
                <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span class="text-sm text-yellow-600 sm:text-center">©2024 Skills. All Rights Reserved.
                </span>
                <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" class="hover:underline hover:text-yellow-600 me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline hover:text-yellow-600 me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline hover:text-yellow-600 me-4 md:me-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline hover:text-yellow-600">Contact</a>
                    </li>
                </ul>
                </div>
            </footer>
        </>
    )
}