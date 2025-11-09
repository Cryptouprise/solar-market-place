# Contributing to Solar Market Place

Thank you for your interest in contributing to Solar Market Place! We welcome contributions from the community.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/solar-market-place.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Run tests and linting
6. Commit your changes with a descriptive message
7. Push to your fork
8. Open a Pull Request

## Development Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Initialize database
npm run db:setup

# Run development server
npm run dev
```

## Code Style

- We use Prettier for code formatting
- We use ESLint for code quality
- Run `npm run format` before committing
- Run `npm run lint` to check for issues

## Commit Messages

- Use clear and meaningful commit messages
- Start with a verb in present tense (Add, Fix, Update, Remove)
- Keep first line under 72 characters
- Add more detail in the description if needed

Examples:

- `Add product search functionality`
- `Fix cart total calculation bug`
- `Update README with deployment instructions`

## Pull Request Process

1. Update documentation if you've changed APIs
2. Add tests for new features
3. Ensure all tests pass
4. Update the README.md if needed
5. Your PR will be reviewed by maintainers

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Database Changes

- Always create migrations for schema changes
- Test migrations both up and down
- Update seed data if necessary

```bash
# Create a migration
npx prisma migrate dev --name your_migration_name

# Reset database and re-seed
npm run db:setup
```

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Report unacceptable behavior to the maintainers

## Questions?

Feel free to open an issue for questions or discussion!
