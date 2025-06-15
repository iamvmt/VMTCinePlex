import React from 'react'

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-36 mt-16 w-full text-gray-300">
      <div className="flex flex-col lg:flex-row justify-between w-full gap-6 lg:gap-8 border-b border-gray-500 pb-6">
        <div className="lg:max-w-80">
          <img className="w-28 h-auto" src="/src/assets/WhiteMainLogo.svg" alt="logo" />
          <p className="mt-3 text-xs leading-relaxed">
            VMTCinePlex is your ultimate movie destination, offering premium cinematic experiences with state-of-the-art technology, comfortable seating, and the latest blockbuster films for unforgettable entertainment moments.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg" alt="google play" className="h-7 w-auto border border-white rounded" />
            <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg" alt="app store" className="h-7 w-auto border border-white rounded" />
          </div>
        </div>
        <div className="flex-1 flex items-start justify-start lg:justify-end gap-12 lg:gap-16">
          <div>
            <h2 className="font-semibold mb-3 text-sm">Company</h2>
            <ul className="text-xs space-y-1.5">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy policy</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-3 text-sm">Get in touch</h2>
            <div className="text-xs space-y-1.5">
              <p className="hover:text-white transition-colors cursor-pointer">+91-93412-39691</p>
              <p className="hover:text-white transition-colors cursor-pointer">vivekmanitripathy@gmail.com</p>
              <div className="flex items-center gap-3 mt-2">
                <a href="https://github.com/iamvmt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://instagram.com/iamvmt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.084 5.52.199 5.012.374a6.5 6.5 0 00-2.346 1.529 6.5 6.5 0 00-1.53 2.346C.862 4.758.748 5.332.712 6.279.677 7.227.664 7.634.664 11.255s.013 4.028.048 4.976c.036.947.151 1.521.326 2.029a6.5 6.5 0 001.529 2.346 6.5 6.5 0 002.346 1.53c.508.175 1.082.29 2.029.326.948.035 1.355.048 4.976.048s4.028-.013 4.976-.048c.947-.036 1.521-.151 2.029-.326a6.5 6.5 0 002.346-1.53 6.5 6.5 0 001.53-2.346c.175-.508.29-1.082.326-2.029.035-.948.048-1.355.048-4.976s-.013-4.028-.048-4.976c-.036-.947-.151-1.521-.326-2.029a6.5 6.5 0 00-1.53-2.346A6.5 6.5 0 0018.995.374C18.487.199 17.913.084 16.966.048 16.018.013 15.611 0 11.99 0h.027zm-.785 2.166h.862c3.548 0 3.967.014 5.37.048.864.035 1.332.164 1.645.273.414.16.709.352.996.639.287.287.479.582.639.996.109.313.238.781.273 1.645.034 1.403.048 1.822.048 5.37s-.014 3.967-.048 5.37c-.035.864-.164 1.332-.273 1.645a2.678 2.678 0 01-.639.996 2.678 2.678 0 01-.996.639c-.313.109-.781.238-1.645.273-1.403.034-1.822.048-5.37.048s-3.967-.014-5.37-.048c-.864-.035-1.332-.164-1.645-.273a2.678 2.678 0 01-.996-.639 2.678 2.678 0 01-.639-.996c-.109-.313-.238-.781-.273-1.645-.034-1.403-.048-1.822-.048-5.37s.014-3.967.048-5.37c.035-.864.164-1.332.273-1.645.16-.414.352-.709.639-.996a2.678 2.678 0 01.996-.639c.313-.109.781-.238 1.645-.273 1.403-.034 1.822-.048 5.37-.048z"/>
                    <path d="M12.017 15.833a3.833 3.833 0 110-7.666 3.833 3.833 0 010 7.666zm0-9.74a5.907 5.907 0 100 11.814 5.907 5.907 0 000-11.814zm7.507-1.17a1.38 1.38 0 11-2.76 0 1.38 1.38 0 012.76 0z"/>
                  </svg>
                </a>
                <a href="mailto:vivekmanitripathy@gmail.com" className="hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-3 text-center text-xs pb-3">
        Copyright {new Date().getFullYear()} © VMTCinePlex. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer