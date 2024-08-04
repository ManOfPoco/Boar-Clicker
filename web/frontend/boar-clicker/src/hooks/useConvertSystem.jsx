function useConvertSystem() {
    function convertToViewSystem(labelValue) {
        return Math.abs(Number(labelValue)) >= 1.0e9
            ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
            : // Six Zeroes for Millions
              Math.abs(Number(labelValue)) >= 1.0e6
              ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
              : numberWithCommas(Math.abs(Number(labelValue)));
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return { convertToViewSystem };
}

export default useConvertSystem;
