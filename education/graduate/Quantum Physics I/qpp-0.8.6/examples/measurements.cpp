// Measurements
// Source: ./examples/measurements.cpp
#include <qpp.h>

using namespace qpp;

int main()
{
    ket psi = mket({0, 0});
    cmat U = gt.CNOT * kron(gt.H, gt.Id2);
    ket result = U * psi; // we have the Bell state (|00> + |11>) / sqrt(2)

    std::cout << ">> We just produced the Bell state:\n";
    std::cout << disp(result) << std::endl;

    // apply a bit flip on the second qubit
    result = apply(result, gt.X, {1}); // we produced (|01> + |10>) / sqrt(2)
    std::cout << ">> We produced the Bell state:\n";
    std::cout << disp(result) << std::endl;

    // measure the first qubit in the X basis
    auto measured = measure(result, gt.H, {0});
    std::cout << ">> Measurement result: " << std::get<0>(measured);
    std::cout << std::endl << ">> Probabilities: ";
    std::cout << disp(std::get<1>(measured), ", ") << std::endl;
    std::cout << ">> Resulting states: " << std::endl;
    for (auto&& it : std::get<2>(measured))
        std::cout << disp(it) << std::endl;
}
