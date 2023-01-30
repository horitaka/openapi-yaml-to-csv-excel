**This project is still in development**

# openapi-yaml-to-csv-excel

This is a CLI tool for converting OpenAPI YAML file to CSV/Excel.

**Input file**

**Output file**

## Usage

### Convert to CSV/Excel

**Command**

```bash
npx opapi-convert convert -i input-yaml-file -o output-csv/excel-file
```

**Options**

| Option       | Description      |
| ------------ | ---------------- |
| -i, --input  | Input file name  |
| -o, --output | Output file name |

### Update existing file

**Command**

```bash
npx opapi-convert update -i input-yaml-file -u updating-csv/excel-file
```

**Options**

| Option       | Description        |
| ------------ | ------------------ |
| -i, --input  | Input file name    |
| -u, --update | Updating file name |

## Roadmap

- [ ] Add converter to excel
- [ ] Add update command
- [ ] Add an option for selecting output colums

## Contributing

Contributions are welcome! See the contribution guidelines.

## License

OpenAPI YAML to CSV/Excel is available under the MIT License.
