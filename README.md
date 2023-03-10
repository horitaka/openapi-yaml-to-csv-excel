# OpenAPI YAML to CSV/Excel Converter

[![test](https://github.com/horitaka/openapi-yaml-to-csv-excel/actions/workflows/ci.yaml/badge.svg)](https://github.com/horitaka/openapi-yaml-to-csv-excel)
<a href="https://www.npmjs.com/package/openapi-yaml-to-csv-excel"><img src="https://img.shields.io/npm/v/openapi-yaml-to-csv-excel.svg" alt="Version"></a>

This is a CLI tool for converting [OpenAPI](https://spec.openapis.org/oas/v3.1.0) YAML file to CSV/Excel file. Please see the following examples below to better understand this tool.

**Input file example**

[input.yaml](examples/input.yaml)

**Output file example**

[output.csv](examples/output.csv)
[output.xlsx](examples/output.xlsx)

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

**Command**

```bash
npx openapi-yaml-to-csv-excel convert -i input-file.yaml -o output-file.csv
```

```bash
npx openapi-yaml-to-csv-excel convert -i input-file.yaml -o output-file.xlsx
```

**Options**

| Option       | Required | Description      |
| ------------ | -------- | ---------------- |
| -i, --input  | yes      | Input file name  |
| -o, --output | no       | Output file name |

### Update existing file

**Command**

```bash
npx openapi-yaml-to-csv-excel update -i input-file.yaml -u update-file.csv -o output-file.csv
```

```bash
npx openapi-yaml-to-csv-excel update -i input-file.yaml -u update-file.xlsx -o output-file.xlsx
```

**Options**

| Option       | Required | Description        |
| ------------ | -------- | ------------------ |
| -i, --input  | yes      | Input file name    |
| -u, --update | yes      | Updating file name |
| -o, --output | no       | Output file name   |

## Roadmap

- [x] Add update command
- [x] Add converter to excel
- [ ] Add an option for selecting output columns
- [ ] Add an option for specifying update csv header names
- [ ] Support all OpenAPI fields

## Contributing

Contributions are welcome! If you find a bug or want to request a new feature, please open a new issue.

## License

OpenAPI YAML to CSV/Excel is available under the MIT License.
