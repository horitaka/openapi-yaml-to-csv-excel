# OpenAPI YAML to CSV/Excel Converter

This is a CLI tool for converting [OpenAPI](https://spec.openapis.org/oas/v3.1.0) YAML file to CSV/Excel file. Please see the following examples below to better understand this tool.

**Input file example**

[input.yaml](examples/input.yaml)

**Output file example**

[output.csv](examples/output.csv)

This tool supports OpenAPI 3.0.0 or later and supports fields below.

| Field name                  | Support |
| --------------------------- | :-----: |
| [path].summary              |   ✅    |
| [path].descripition         |   ✅    |
| [path].[method].tags        |   ✅    |
| [path].[method].summary     |   ✅    |
| [path].[method].description |   ✅    |
| [path].[method].operationId |   ✅    |

## Usage

### Convert to CSV/Excel

> **Note**
>
> Currently, only CSV file convert is supported. Excel file convert will be supported soon!

**Command**

```bash
npx oapi-convert convert -i input-file.yaml -o output-file.csv
```

**Options**

| Option       | Required | Description      |
| ------------ | -------- | ---------------- |
| -i, --input  | yes      | Input file name  |
| -o, --output | no       | Output file name |

### Update existing file

**Command**

```bash
npx oapi-convert update -i input-file.yaml -u update-file.csv -o output-file.csv
```

**Options**

| Option       | Required | Description        |
| ------------ | -------- | ------------------ |
| -i, --input  | yes      | Input file name    |
| -u, --update | yes      | Updating file name |
| -o, --output | no       | Output file name   |

## Roadmap

- [x] Add update command
- [ ] Add converter to excel
- [ ] Add an option for selecting output columns
- [ ] Add an option for specifying update csv header names
- [ ] Support all OpenAPI fields

## Contributing

Contributions are welcome! If you find a bug or want to request a new feature, please open a new issue.

## License

OpenAPI YAML to CSV/Excel is available under the MIT License.
