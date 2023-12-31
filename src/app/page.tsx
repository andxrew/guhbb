"use client"
import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { Weight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Montserrat } from "next/font/google"

const navigation = [
	{ name: "", href: "#" },
	{ name: "", href: "#" },
	{ name: "", href: "#" },
	{ name: "", href: "#" },
]

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] })

export default function Example() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<div className="isolate bg-white">
			<div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
				<svg
					className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
					viewBox="0 0 1155 678"
				>
					<path
						fill="url(#9b2541ea-d39d-499b-bd42-aeea3e93f5ff)"
						fillOpacity=".3"
						d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
					/>
					<defs>
						<linearGradient
							id="9b2541ea-d39d-499b-bd42-aeea3e93f5ff"
							x1="1155.49"
							x2="-78.208"
							y1=".177"
							y2="474.645"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#62e856" />
							<stop
								offset={1}
								stopColor="#62e856"
							/>
						</linearGradient>
					</defs>
				</svg>
			</div>
			<div className="px-6 pt-6 lg:px-8">
				<nav className="flex items-center justify-between p-4">
					<div className="flex items-center space-x-6">
						<Link
							href="/dashboard"
							className="flex items-center lg:mr-[370px]"
						>
							<div className="relative w-10 h-8">
								<Image
									fill
									alt="Logo"
									src="/images/infinity_logo.png"
								/>
							</div>
							<h1 className="text-2xl font-bold tracking-tight">
								Infinity<span className="text-green-600">Tech </span>
							</h1>
						</Link>
						<div className="hidden lg:flex space-x-6">
							{navigation.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className="text-sm font-semibold leading-6 text-green-900 hover:text-green-600"
								>
									{item.name}
								</a>
							))}
						</div>
					</div>
					<div className="hidden lg:flex space-x-4">
						<a
							href="/dashboard"
							className="text-sm font-semibold md:leading-6 text-gray-900 hover:text-gray-600"
						>
							Log in <span aria-hidden="true">&rarr;</span>
						</a>
					</div>
					<div className="lg:hidden">
						<button
							type="button"
							className="p-2 text-gray-700"
							onClick={() => setMobileMenuOpen(true)}
						>
							<span className="sr-only">Open main menu</span>
							<Bars3Icon
								className="h-6 w-6"
								aria-hidden="true"
							/>
						</button>
					</div>
				</nav>

				<Dialog
					as="div"
					open={mobileMenuOpen}
					onClose={setMobileMenuOpen}
				>
					<Dialog.Panel
						// focus="true"
						className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden"
					>
						<div className="flex items-center justify-between">
							<Link
								href={"/dashboard"}
								className="flex items-center pl-3 mb-14"
							>
								<div className="relative w-10 h-8 mr-0">
									<Image
										fill
										alt="Logo"
										src="/images/infinity_logo.png"
									/>
								</div>
							</Link>
							<button
								type="button"
								className="-m-2.5 rounded-md p-2.5 text-gray-700"
								onClick={() => setMobileMenuOpen(false)}
							>
								<span className="sr-only">Close menu</span>
								<XMarkIcon
									className="h-6 w-6"
									aria-hidden="true"
								/>
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="space-y-2 py-6">
									{navigation.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
										>
											{item.name}
										</a>
									))}
								</div>
								<div className="py-6">
									<a
										href="/dashboard"
										className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
									>
										Log in
									</a>
								</div>
							</div>
						</div>
					</Dialog.Panel>
				</Dialog>
			</div>
			<main>
				<div className="relative py-24 sm:py-32 lg:pb-40">
					<div className="mx-auto max-w-7xl px-6 lg:px-8">
						<div className="mx-auto max-w-2xl text-center">
							<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
								Sustainable AI for a Greener Tomorrow
							</h1>
							<p className="mt-6 text-lg leading-8 text-green-800 font-bold">
								With Infinity, your interactions help contribute to UK tree
								charities such as{" "}
								<a
									href="https://www.woodlandtrust.org.uk"
									className="text-green-500"
									target="_blank"
								>
									Woodland Trust
								</a>{" "}
								helping nurture our planets future and making a difference. Join
								us in creating art, music, and a greener world, one chat at a
								time.
							</p>
							<div className="mt-10 flex items-center justify-center gap-x-6">
								<a
									href="/dashboard"
									className="rounded-md bg-green-600 hover:bg-green-400 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
								>
									Get started
								</a>
								<a
									href="#"
									className="text-base font-semibold leading-7 text-gray-900"
								>
									Learn more <span aria-hidden="true">→</span>
								</a>
							</div>
						</div>
						<div className="mt-16 flow-root sm:mt-24">
							<div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
								<img
									src="/images/example.png"
									alt="App screenshot"
									width={2432}
									height={1442}
									className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
								/>
							</div>
						</div>
					</div>
					<div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
						<svg
							className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
							viewBox="0 0 1155 678"
						>
							<path
								fill="url(#b9e4a85f-ccd5-4151-8e84-ab55c66e5aa1)"
								fillOpacity=".3"
								d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
							/>
							<defs>
								<linearGradient
									id="b9e4a85f-ccd5-4151-8e84-ab55c66e5aa1"
									x1="1155.49"
									x2="-78.208"
									y1=".177"
									y2="474.645"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="#62e856" />
									<stop
										offset={1}
										stopColor="#62e856"
									/>
								</linearGradient>
							</defs>
						</svg>
					</div>
				</div>
			</main>
		</div>
	)
}
