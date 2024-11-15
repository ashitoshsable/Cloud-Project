import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import viewCoursesPhoto from '../assets/viewcoursesphoto.png'

const features = [
  {
    name: 'Instant updates.',
    description:
      'Changes are instantly available to you, allowing for real-time adjustments. Each course update is just a click away, ensuring you’re always up-to-date.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Protected access.',
    description: 'Enjoy secure and private course management. With built-in data encryption, your information remains safe and accessible only to you.',
    icon: LockClosedIcon,
  },
  {
    name: 'Automated course backups.',
    description: 'Your courses are backed up for safekeeping. Never lose track of your academic records.',
    icon: ServerIcon,
  },
]

export default function Features() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-yellow-600">Manage your learning journey with ease.</h2>
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Streamline Learning
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
              With Skills, keep track of your entire academic journey in one place. Simplify course organization with easy-to-use features that save you time and effort.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute left-1 top-1 size-5 text-yellow-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src={viewCoursesPhoto}
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  )
}
