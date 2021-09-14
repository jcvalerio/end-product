// TODO: @Guaria reuse existing enum from libs/entity/src/types/enums/general.ts on Kapitan
export enum StatisticalType {
  Image = 'Data - Image',
  Color = 'Data - Color',
  NumericTemporal = 'Data - Numeric - Temporal',
  CategoricalBinary = 'Data - Categorical - Binary',
  /**
   * Resolves to Radio Group / autocomplete depending on the number of selections
   * RadioGroup < 4 < AutoComplete
   */
  Data = 'Data - Categorical',
}
