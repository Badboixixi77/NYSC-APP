# NYSC Hack - Corps Member Life Management App

A comprehensive web application designed to help NYSC corps members manage their service year effectively. The app provides features for PPA search, clearance reminders, community engagement, and access to important resources.

## Features

- **PPA Search & Rating**: Find and rate Primary Place of Assignment locations
- **Clearance Reminder**: Get timely notifications for all NYSC activities
- **Community Hub**: Connect with corps members in your state or LGA
- **Information Center**: Access sample letters, tips, and resources

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Firebase (Authentication, Firestore, Storage)
- React Hot Toast for notifications

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nysc-app.git
cd nysc-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Firebase configuration:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # App router pages
│   ├── auth/              # Authentication pages
│   ├── ppa-search/        # PPA search feature
│   ├── clearance/         # Clearance management
│   ├── community/         # Community features
│   └── info-center/       # Information resources
├── components/            # Reusable components
├── lib/                   # Utility functions and Firebase config
└── styles/               # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- NYSC for the opportunity to serve
- All corps members who contributed ideas and feedback
- The open-source community for the amazing tools and libraries 