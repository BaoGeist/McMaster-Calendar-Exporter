# McMaster Calendar Exporter

A web application developed to help McMaster University students export their course schedules to Google Calendar after the university discontinued its official tool.

## Features
- Export McMaster course schedules to Google Calendar
- OAuth 2.0 authentication for secure Google API integration
- Built with **React**, **Supabase**, and hosted on **Vercel**
- Open-source and free to use!

## Installation

To run the project locally, follow these steps:

1. Clone this repository:
    ```bash
    git clone https://github.com/BaoGeist/McMaster-Calendar-Exporter.git
    ```

2. Navigate to the project directory:
    ```bash
    cd McMaster-Calendar-Exporter
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

4. Create a .env file in the root directory with the necessary environment variables:
    ```
    NEXT_PUBLIC_SUPABASE_URL=<YOUR_KEY>
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR_KEY>
    ```
5. Start the development server:
    ```bash
    npm start
    ```

## Contributing
We welcome contributions! To contribute:

- Fork the repository
- Create a feature branch (git checkout -b feature-branch)
- Commit your changes (git commit -m 'Add new feature')
- Push to the branch (git push origin feature-branch)
- Open a pull request

Please ensure your code follows the project's style guide and includes tests where appropriate.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
Google Calendar API, React, Supabase
